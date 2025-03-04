package main

import (
	"CRUD-Operations/api"
	"context"
	"log"
	"net/http"
	"strings"
	"time"

	"github.com/golang-jwt/jwt"
	"github.com/jackc/pgx/v5"
	"github.com/labstack/echo/v4"            // Echo framework for routing
	"github.com/labstack/echo/v4/middleware" // Useful middleware (logging, recovery, etc)
	"golang.org/x/crypto/bcrypt"
)

// Глобальные переменные
var conn *pgx.Conn
var secretKey = []byte("your-secret-256-bit-code") // Защищенный ключ JWT

// Сервер реализует конечные точки API, определенные в сгенерированном коде.
type Server struct{}

// Инициализация подключения к базе данных
func initDB() {
	var err error
	connString := "postgresql://andrejzadoroznyj:password@localhost:5432/MyDatabase3?sslmode=disable"
	conn, err = pgx.Connect(context.Background(), connString)
	if err != nil {
		log.Fatalf("Database connection failed: %v\n", err)
	}
	log.Println("Database connected!")
}

// Безопасное хэширование пароля
func hashPassword(password string) (string, error) {
	hashedBytes, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return "", err
	}
	return string(hashedBytes), nil
}

// Проверка пароля по сохраненному хэшу
func verifyPassword(hashedPassword, password string) error {
	return bcrypt.CompareHashAndPassword([]byte(hashedPassword), []byte(password))
}

// Сгенерируйте токен JWT
func GenerateJWT(email string) string {
	token := jwt.New(jwt.SigningMethodHS256)
	claims := token.Claims.(jwt.MapClaims)
	claims["email"] = email
	claims["exp"] = time.Now().Add(time.Hour * 1).Unix() // Срок действия токена истекает через 1 час

	tokenString, err := token.SignedString(secretKey)
	if err != nil {
		log.Printf("JWT generation failed: %v", err)
		return ""
	}
	return tokenString
}

// PostAuthLogin - вход пользователя в систему
func (s *Server) PostAuthLogin(ctx echo.Context) error {
	var req api.LoginRequest
	if err := ctx.Bind(&req); err != nil {
		return ctx.JSON(http.StatusBadRequest, api.Error{Code: 400, Message: "Invalid request format"})
	}

	// Проверьте учетные данные пользователя в базе данных
	var storedPassword string
	err := conn.QueryRow(context.Background(),
		`SELECT password_hash FROM users WHERE email = $1`, req.Login).Scan(&storedPassword)

	if err != nil {
		return ctx.JSON(http.StatusUnauthorized, api.Error{Code: 401, Message: "Invalid credentials"})
	}

	// Проверка пароля
	if err := verifyPassword(storedPassword, req.Password); err != nil {
		return ctx.JSON(http.StatusUnauthorized, api.Error{Code: 401, Message: "Invalid credentials"})
	}

	// Создайте JWT
	token := GenerateJWT(req.Login)
	if token == "" {
		return ctx.JSON(http.StatusInternalServerError, api.Error{Code: 500, Message: "Failed to generate token"})
	}

	return ctx.JSON(http.StatusOK, api.LoginResponse{Token: token})
}

// PostAuthCheck - проверка подлинности токена
func (s *Server) PostAuthCheck(ctx echo.Context) error {
	authHeader := ctx.Request().Header.Get("Authorization")
	if authHeader == "" {
		return ctx.JSON(http.StatusUnauthorized, api.Error{Code: 401, Message: "Missing token"})
	}

	tokenString := strings.TrimPrefix(authHeader, "Bearer ")
	_, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		return secretKey, nil
	})

	if err != nil {
		return ctx.JSON(http.StatusUnauthorized, api.Error{Code: 401, Message: "Invalid token"})
	}

	return ctx.NoContent(http.StatusNoContent)
}

// GetGrants - Получение грантов (пока фиктивные данные)
func (s *Server) GetGrants(ctx echo.Context, params api.GetGrantsParams) error {
	grants := []api.Grant{
		{Id: 1, Title: "Grant A", SourceUrl: "https://example.com/a"},
		{Id: 2, Title: "Grant B", SourceUrl: "https://example.com/b"},
	}
	return ctx.JSON(http.StatusOK, api.GrantsResponse{Grants: grants})
}

func (s *Server) SetGrantsGrantId(ctx echo.Context, grantId int) error {

	grant := api.Grant{
		Id:        grantId,
		Title:     "Example Grant",
		SourceUrl: "https://example.com/grant",
	}
	return ctx.JSON(http.StatusOK, grant)
}

func (s *Server) GetGrantsGrantId(ctx echo.Context, grantId int) error {
	// Моделирование получения одного гранта из базы данных
	grant := api.Grant{
		Id:        grantId,
		Title:     "Example Grant",
		SourceUrl: "https://example.com/grant",
	}
	return ctx.JSON(http.StatusOK, grant)
}

func (s *Server) PutGrantsGrantIdFilters(ctx echo.Context, grantId int) error {
	//
	return ctx.NoContent(http.StatusNoContent)
}

func main() {
	initDB()
	defer conn.Close(context.Background())

	// Создайте эхо-сервер
	e := echo.New()
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())

	// Подача статических файлов
	e.Static("/", "frontend")

	// Регистрация маршрутов API
	server := &Server{}
	api.RegisterHandlersWithBaseURL(e, server, "/admin/api/v1")

	// Запуск сервера
	log.Println("Server running on port 8080")
	e.Logger.Fatal(e.Start(":8080"))
}
