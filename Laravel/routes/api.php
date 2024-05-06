<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::get('/students', [StudentController::class, 'index'])->name('studenst');
Route::post('/students', [StudentController::class, 'store'])->name('store');

Route::post('/signup', [AuthController::class, 'signup'])->name('signup');
Route::post('/login', [AuthController::class, 'login'])->name('login');



Route::middleware('auth:sanctum')->group(function () {

    Route::post('/logout', [AuthController::class, 'logout'])->name('logout');



    });
Route::get('/users', [UserController::class, 'index'])->name('users');
Route::get('/user/{id}', [UserController::class, 'show'])->name('show');
Route::put('/user/{id}', [UserController::class, 'update'])->name('update');
Route::delete('/user/{id}', [UserController::class, 'destroy'])->name('destroy');
