<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Http\Resources\v1\TaskCollection;
use App\Http\Resources\v1\TaskResource;
use App\Models\Task;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Get all tasks for the user.
     * @param $id
     * @return TaskCollection|JsonResponse
     */
    public function userTasks($id): TaskCollection|\Illuminate\Http\JsonResponse
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json(['error' => 'User not found.'], 404);
        }
        return new TaskCollection(Task::where('user_id', $id)->get());
    }

    /**
     * Create a new task for the user.
     * @param StoreTaskRequest $request
     * @param $id
     * @return TaskResource|JsonResponse
     */
    public function createTask(StoreTaskRequest $request, $id): TaskResource|\Illuminate\Http\JsonResponse
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json(['error' => 'User not found.'], 404);
        }

        $task = Task::create($request->validated());
        $task->user_id = $id;
        $task->save();
        return new TaskResource($task);
    }
}
