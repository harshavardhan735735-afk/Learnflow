"""
Chapters router — list chapters under a subject.
"""
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from database import get_db
from models import Chapter
from schemas import ChapterResponse

router = APIRouter()


@router.get("/{subject_id}", response_model=List[ChapterResponse])
def get_chapters(subject_id: int, db: Session = Depends(get_db)):
    """Get all chapters for a subject, ordered by order_num."""
    chapters = (
        db.query(Chapter)
        .filter(Chapter.subject_id == subject_id)
        .order_by(Chapter.order_num)
        .all()
    )
    return chapters
