<?php

use App\Jobs\SendMailJob;
use App\Mail\UserRegistrationMail;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\ProjectController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::get('/apitest', [UserController::class, 'apitest']);






//User////////////////////////////////////////////////////////////////////////////////////////

//unauthorized
Route::post('/signup', [AuthController::class, 'signup'])->name('signup');
Route::post('/login', [AuthController::class, 'login'])->name('login');


Route::middleware('auth:sanctum')->group(function () {

/// Task ////////////////////////
    Route::get('/tasks/userassinedtask/{id}', [TaskController::class, 'userAssinedTasks']);
    Route::get('/tasks/usertask/{id}', [TaskController::class, 'userTasks']);
    Route::resource('tasks', TaskController::class);
    Route::get('/tasks/search/{search}', [TaskController::class, 'searchtask']);
/// Projects ////////////////////////
    Route::put('/projects/priorityupdate/{id}', [ProjectController::class, 'priorityupdate']);
    Route::get('/projects/search/{search}', [ProjectController::class, 'searchproject']);
    Route::get('/projects/showTasks/{id}', [ProjectController::class, 'showTasks']);
    Route::resource('projects', ProjectController::class);
});



//Authorized
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout'])->name('logout');
    Route::get('/users', [UserController::class, 'index'])->name('users');
    Route::get('/user/{id}', [UserController::class, 'show'])->name('show');
    Route::put('/user/{id}', [UserController::class, 'update'])->name('update');
    Route::delete('/user/{id}', [UserController::class, 'destroy'])->name('destroy');
    Route::get('/userall', [UserController::class, 'userall'])->name('userall');
    Route::get('/userselect/{id}', [UserController::class, 'userselect'])->name('userselect');

    Route::get('/authuser', [UserController::class, 'authuser'])->name('authuser');
});

Route::get('user-registration-email', function () {
//    SendMailJob::dispatch();
//    dd('Email was sent') ;

    $user = User::latest()->first();
    dd($user->email);
});











