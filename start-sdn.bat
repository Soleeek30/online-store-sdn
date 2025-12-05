@echo off
title SDN - Запуск сервера и клиента
color 0A

echo ========================================
echo    SDN - Интернет-магазин электроники
echo ========================================
echo.
echo Запуск сервера и клиента...
echo.

:: Запускаем сервер в новом окне
start "SDN Server" cmd /k "cd /d %~dp0server && npm start"

:: Ждём 3 секунды
timeout /t 3 /nobreak > nul

:: Запускаем клиент в новом окне
start "SDN Client" cmd /k "cd /d %~dp0client && npm start"

echo.
echo ========================================
echo Сервер запущен на http://localhost:5000
echo Клиент запущен на http://localhost:3000
echo ========================================
echo.
echo Браузер откроется автоматически через несколько секунд...
echo.
echo Для остановки закройте окна сервера и клиента
echo ========================================

timeout /t 5 /nobreak > nul
start http://localhost:3000

exit