<?php

namespace App\Http\Controllers;

use App\Http\Resources\TaskResource;
use Illuminate\Http\Request;
use App\Models\Task;
use App\Models\User;
use yajra\Datatables\Datatables;
class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
//        $tasks = Task::paginate(10);
//        return TaskResource::collection($tasks);
//
//        //add pagination
         $tasks = Task::paginate(10);
         return TaskResource::collection($tasks);

    }

    public function userTasks($id)
    {
        $tasks = Task::where('assigned_user_id', $id)->get();
        return TaskResource::collection($tasks);
    }

    public function userAssinedTasks($id)
    {
        $tasks = Task::where('creator_user_id', $id)->get();
        return TaskResource::collection($tasks);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $user = auth()->user();
        $request->validate([
            'project_id' => 'required|exists:projects,id',
            'name' => 'required',
            'description' => 'required',
            'priority' => 'required|in:Low,Medium,High', // Use the 'in' rule to validate priority values
            'status' => 'required|in:New,In_progress,Completed', // Use the 'in' rule to validate status values
            'comment' => 'nullable|string',
            'reply' => 'nullable|string',
            'due_date' => 'nullable|date|after:today',
            'creator_user_id' => $user->id,
            'assigned_user_id' => 'required|exists:users,id',
        ]);
        $task = Task::create($request->all());
        return new TaskResource($task);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $task = Task::find($id);
        return new TaskResource($task);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'name' => 'required',
            'description' => 'required',
            'priority' => 'required|in:Low,Medium,High',
            'status' => 'required|in:New,In_Progress,Completed',
            'comment' => 'nullable|string',
            'reply' => 'nullable|string',
            'due_date' => 'nullable|date',
            'creator_user_id' => 'required|exists:users,id',
            'assigned_user_id' => 'required|exists:users,id',
        ]);
        $task = Task::find($id);
        $task->name = $request->name;
        $task->description = $request->description;
        $task->priority = $request->priority;
        $task->status = $request->status;
        $task->comment = $request->comment;
        $task->reply = $request->reply;
        $task->due_date = $request->due_date;
        $task->creator_user_id = $request->creator_user_id;
        $task->assigned_user_id = $request->assigned_user_id;
        $task->save();
        return [
            'task' => new TaskResource($task),
            'message' => 'Task updated successfully'];
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $task = Task::find($id);
        $task->delete();
        return response()->json(null, 204);
    }
}
