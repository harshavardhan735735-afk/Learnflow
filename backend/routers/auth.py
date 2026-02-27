"""
Authentication router — signup, login, JWT tokens.
"""
from datetime import datetime, timedelta
from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from database import get_db
from models import Student
from schemas import StudentCreate, StudentLogin, TokenResponse, StudentProfile

router = APIRouter()

# Simple JWT-like token using base64 (for hackathon — use python-jose in production)
import hashlib
import base64
import json


def _hash_password(password: str) -> str:
    return hashlib.sha256(password.encode()).hexdigest()


def _verify_password(password: str, hashed: str) -> bool:
    return _hash_password(password) == hashed


def _create_token(student_id: int, name: str) -> str:
    payload = {"sub": student_id, "name": name, "exp": (datetime.utcnow() + timedelta(days=30)).isoformat()}
    return base64.b64encode(json.dumps(payload).encode()).decode()


def _decode_token(token: str) -> dict:
    try:
        return json.loads(base64.b64decode(token).decode())
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid token")


@router.post("/signup", response_model=TokenResponse)
def signup(req: StudentCreate, db: Session = Depends(get_db)):
    existing = db.query(Student).filter(Student.email == req.email).first()
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")

    student = Student(
        name=req.name,
        email=req.email,
        password_hash=_hash_password(req.password),
        exam_type=req.exam_type,
    )
    db.add(student)
    db.commit()
    db.refresh(student)

    token = _create_token(student.id, student.name)
    return TokenResponse(
        access_token=token,
        student_id=student.id,
        name=student.name,
        exam_type=student.exam_type.value,
    )


@router.post("/login", response_model=TokenResponse)
def login(req: StudentLogin, db: Session = Depends(get_db)):
    student = db.query(Student).filter(Student.email == req.email).first()
    if not student or not _verify_password(req.password, student.password_hash):
        raise HTTPException(status_code=401, detail="Invalid email or password")

    token = _create_token(student.id, student.name)
    return TokenResponse(
        access_token=token,
        student_id=student.id,
        name=student.name,
        exam_type=student.exam_type.value,
    )


@router.get("/me/{student_id}", response_model=StudentProfile)
def get_profile(student_id: int, db: Session = Depends(get_db)):
    student = db.query(Student).filter(Student.id == student_id).first()
    if not student:
        raise HTTPException(status_code=404, detail="Student not found")
    return student
