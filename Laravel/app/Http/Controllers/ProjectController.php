<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;
use App\Http\Resources\ProjectResource;
use App\Models\User;
use App\Models\Task;
use App\Http\Resources\TaskResource;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $tasks = Project::orderBy('created_at', 'desc')->paginate(10);
        return ProjectResource::collection($tasks);
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
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'description' => 'required',
            'status' => 'required|in:New,In_Progress,Completed',
            'priority' => 'required|in:Low,Medium,High',
            'due_date' => 'nullable|date|after:today',
        ]);

        $user = auth()->user();

        $project = new Project();
        $project->name=$request->name;
        $project->description=$request->description;
        $project->status=$request->status;
        $project->priority=$request->priority;
        $project->due_date=$request->due_date;
        $project->creator_user_id=$user->id;
        $project->save();
        return [
            'project' => new ProjectResource($project),
            'message' => 'Project created successfully'
        ];

    }

    /**
     * Display the specified resource.
     */
    public function show(Project $project)
    {
        return [
            'project' => new ProjectResource($project)
        ];
    }

    public function showTasks($id)
    {
        $tasks = Task::where('project_id', $id)->paginate(5);
        return TaskResource::collection($tasks);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Project $project)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Project $project)
    {
        $request->validate([
            'name' => 'required',
            'description' => 'required',
            'status' => 'required|in:New,In_Progress,Completed',
            'priority' => 'required|in:Low,Medium,High',
            'due_date' => 'nullable|date|after:today',
        ]);

        $project->name=$request->name;
        $project->description=$request->description;
        $project->status=$request->status;
        $project->priority=$request->priority;
        $project->due_date=$request->due_date;
        $project->save();

        return [
            'project' => new ProjectResource($project),
            'message' => 'Project updated successfully'
        ];
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Project $project)
    {
        $project->delete();
        return [
            'message' => 'Project deleted successfully'
        ];
    }
}
