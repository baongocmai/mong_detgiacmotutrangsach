from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from jose import jwt
from passlib.context import CryptContext
import datetime

# Khởi tạo FastAPI
app = FastAPI()
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mã hóa mật khẩu
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Tạo SECRET_KEY và cấu hình JWT
SECRET_KEY = "mysecretkey123456"  # Đổi thành secret key của bạn
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

# Mock dữ liệu admin
mock_admin_data = {
    "email": "hoangminhdiep_t67@hus.edu.vn",
    "password": pwd_context.hash("123456")  # Mật khẩu đã mã hóa
}

# Schema cho yêu cầu đăng nhập
class LoginRequest(BaseModel):
    email: str
    password: str

# Hàm kiểm tra mật khẩu
def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

# Hàm tạo access token
def create_access_token(data: dict, expires_delta: datetime.timedelta = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.datetime.utcnow() + expires_delta
    else:
        expire = datetime.datetime.utcnow() + datetime.timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

# API xử lý đăng nhập
@app.post("/login")
async def login(login_request: LoginRequest):
    # Kiểm tra thông tin đăng nhập từ mock dữ liệu
    if login_request.email != mock_admin_data["email"] or not verify_password(
        login_request.password, mock_admin_data["password"]
    ):
        raise HTTPException(status_code=401, detail="Email hoặc mật khẩu không đúng!")

    # Tạo access token
    access_token_expires = datetime.timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": mock_admin_data["email"]}, expires_delta=access_token_expires
    )

    return {"access_token": access_token, "token_type": "bearer"}
