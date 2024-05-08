<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'priority',
        'status',
        'comment',
        'due_date',
        'creator_user_id',
        'assigned_user_id',
    ];


    //task belongs to a user coumn creator_user_id, assigned_user_id
    public function creator()
    {
        return $this->belongsTo(User::class, 'creator_user_id');
    }

    public function assigned()
    {
        return $this->belongsTo(User::class, 'assigned_user_id');
    }

}
