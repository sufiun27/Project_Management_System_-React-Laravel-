<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;



    public function project()
    {
        return $this->belongsTo(Project::class, 'project_id');
    }

    //task belongs to a user coumn creator_user_id, assigned_user_id
    public function creator()
    {
        return $this->belongsTo(User::class, 'creator_user_id');
    }

    public function getCreatorNameAttribute()
    {
        return $this->creator->name;
    }

    public function getAssignedUserNameAttribute()
    {
        return $this->assigned->name;
    }
    public function assigned()
    {
        return $this->belongsTo(User::class, 'assigned_user_id');
    }

}
