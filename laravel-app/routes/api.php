<?php

use Illuminate\Support\Facades\Route;

Route::prefix('google')->group(function () {
    Route::get('/oauth/redirect', [App\Http\Controllers\API\GoogleOAuthController::class, 'googleOAuthRedirect']);
    Route::get('/oauth/callback', [App\Http\Controllers\API\GoogleOAuthController::class, 'googleOAuthCallback']);
    Route::post('/oauth/exchange/token', [App\Http\Controllers\API\GoogleOAuthController::class, 'googleOAuthExchangeToken'])->middleware('auth:sanctum');
});

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/signout', [App\Http\Controllers\API\AuthController::class, 'signout']);
    Route::get('/verify', [App\Http\Controllers\API\AuthController::class, 'verify']);
    Route::put('/create/password', [App\Http\Controllers\API\AuthController::class, 'createPassword']);
    Route::put('/change/password', [App\Http\Controllers\API\AuthController::class, 'changePassword']);
    Route::put('/update/profile-image', [App\Http\Controllers\API\AuthController::class, 'updateProfileImage']);
    Route::delete('/delete/profile-image', [App\Http\Controllers\API\AuthController::class, 'deleteProfileImage']);

    Route::middleware('admin')->prefix('users')->group(function () {
        
        Route::get('/', [App\Http\Controllers\API\UserController::class, 'getUsers']); 
        Route::get('/read/{id}', [App\Http\Controllers\API\UserController::class, 'readUser']);
        Route::post('/create', [App\Http\Controllers\API\UserController::class, 'createUser']);
        Route::put('/update/{id}', [App\Http\Controllers\API\UserController::class, 'updateUser']);
        Route::delete('/delete/{id}', [App\Http\Controllers\API\UserController::class, 'deleteUser']);
    });
});