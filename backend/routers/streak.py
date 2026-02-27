"""
Streak & consistency tracking router.
"""
from datetime import date, timedelta
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
from models import StreakData
from schemas import StreakLogRequest, StreakResponse

router = APIRouter()


@router.post("/log")
def log_activity(req: StreakLogRequest, db: Session = Depends(get_db)):
    """Log daily study activity."""
    today = date.today()
    existing = db.query(StreakData).filter(
        StreakData.student_id == req.student_id,
        StreakData.date == today,
    ).first()

    if existing:
        existing.minutes_studied += req.minutes_studied
        existing.tests_taken += req.tests_taken
    else:
        streak = StreakData(
            student_id=req.student_id,
            date=today,
            minutes_studied=req.minutes_studied,
            tests_taken=req.tests_taken,
        )
        db.add(streak)

    db.commit()
    return {"status": "ok", "date": today.isoformat()}


@router.get("/{student_id}", response_model=StreakResponse)
def get_streak(student_id: int, db: Session = Depends(get_db)):
    """Get streak data with consistency score."""
    entries = (
        db.query(StreakData)
        .filter(StreakData.student_id == student_id)
        .order_by(StreakData.date.desc())
        .all()
    )

    if not entries:
        return StreakResponse(
            current_streak=0, longest_streak=0,
            total_days_active=0, total_minutes_studied=0,
            consistency_score=0.0, recent_activity=[],
        )

    # Calculate current streak
    today = date.today()
    dates = sorted(set(e.date for e in entries), reverse=True)
    current_streak = 0
    check_date = today
    for d in dates:
        if d == check_date or d == check_date - timedelta(days=1):
            current_streak += 1
            check_date = d
        else:
            break

    # Calculate longest streak
    sorted_dates = sorted(set(e.date for e in entries))
    longest = 1
    current = 1
    for i in range(1, len(sorted_dates)):
        if (sorted_dates[i] - sorted_dates[i-1]).days == 1:
            current += 1
            longest = max(longest, current)
        else:
            current = 1

    # Consistency score (% of last 30 days active)
    last_30 = today - timedelta(days=30)
    active_in_30 = len([d for d in sorted_dates if d >= last_30])
    consistency = round((active_in_30 / 30) * 100, 1)

    total_mins = sum(e.minutes_studied for e in entries)

    recent = [
        {"date": e.date.isoformat(), "minutes": e.minutes_studied, "tests": e.tests_taken}
        for e in entries[:14]
    ]

    return StreakResponse(
        current_streak=current_streak,
        longest_streak=longest,
        total_days_active=len(sorted_dates),
        total_minutes_studied=total_mins,
        consistency_score=consistency,
        recent_activity=recent,
    )
