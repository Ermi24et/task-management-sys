<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Http\Resources\v1\TaskCollection;
use App\Http\Resources\v1\TaskResource;
use App\Models\Task;
use App\Models\User;
//use GuzzleHttp\Psr7\Request;
use Illuminate\Http\Response;
use Illuminate\Http\Request;
use \Illuminate\Http\JsonResponse;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return new TaskCollection(Task::paginate(20));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTaskRequest $request)
    {
        return new TaskResource(Task::create($request->validated()));
    }

    /**
     * Display the specified resource.
     */
//    public function show(Task $task): TaskResource
//    {
//        return new TaskResource($task);
//    }

    public function show($id): TaskResource|JsonResponse
    {
        $task = Task::find($id);

        if (!$task) {
            return response()->json(['error' => 'Task not found.'], Response::HTTP_NOT_FOUND);
        }

        return new TaskResource($task);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Task $task)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTaskRequest $request, Task $task)
    {
        $task->update($request->validated());

        return new TaskResource($task);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        //
        $task = Task::find($id);
        if (!$task) {
            return response()->json(['error' => 'Task not found.'], Response::HTTP_NOT_FOUND);
        }

        $task->delete();
        return response()->json(null, Response::HTTP_NO_CONTENT);
    }

    /**
     * Assign a task to a user.
     * @param Request $request
     * @param $id
     * @return JsonResponse
     */
    public function assignTask(Request $request, $id): JsonResponse
    {
        $task = Task::find($id);
        if (!$task) {
            return response()->json(['error' => 'Task not found.'], Response::HTTP_NOT_FOUND);
        }

        $user = User::find($request->input('user'));
        if (!$user) {
            return response()->json(['error' => 'User not found.'], Response::HTTP_NOT_FOUND);
        }

        $task->user_id = $user->id;
        $task->save();

        return response()->json([
            'message' => 'Task assigned successfully to ' . $user->name,
            'task' => new TaskResource($task)
        ]);
    }

    /**
     * Show tasks by user.
     */
    public function userTasks($id): TaskCollection | JsonResponse
    {
        $user = User::find($id);
        if (!$user) {
            return response()->json(['error' => 'User not found.'], Response::HTTP_NOT_FOUND);
        }
        return new TaskCollection(Task::where('user_id', $id)->get());
    }

}
