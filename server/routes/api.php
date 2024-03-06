<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(['prefix' => 'v1', 'namespace' => 'App\Http\Controllers\Api\v1'], function () {
    Route::apiResource('tasks', 'TaskController')->middleware('auth:sanctum');
    Route::get('users/{id}/tasks', 'UserController@userTasks')->middleware('auth:sanctum');
    Route::post('users/{id}/tasks', 'UserController@createTask')->middleware('auth:sanctum');
});
