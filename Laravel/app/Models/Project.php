<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;

    //in my project resource i declire that total_task which return the total number of task in the project
    public function tasks()
    {
        return $this->hasMany(Task::class);
    }
    public function creator()
    {
        return $this->belongsTo(User::class, 'creator_user_id');
    }
    public  function getCreatorNameAttribute()
    {
        return $this->creator->name;
    }
    public function getTotalTasksAttribute()
    {
        return $this->tasks->count();
    }

}
