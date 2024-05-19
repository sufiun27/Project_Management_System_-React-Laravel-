<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TaskResource extends JsonResource
{
    public static $wrap = false;

    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    //send only the data

    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,

                'name' => $this->name,
                'description' => $this->description,
                'priority' => $this->priority,
                'status' => $this->status,
                'comment' => $this->comment,
                'reply' => $this->reply,
                'due_date' => $this->due_date,
                'creator_user_id' => $this->creator_user_id,
                'creator_name' => $this->creator_name,
                'assigned_user_id' => $this->assigned_user_id,
                'assigned_user_name' => $this->assigned->name,
                'created_at' => $this->created_at->format('Y-m-d H:i:s'),
                'updated_at' => $this->updated_at->format('Y-m-d H:i:s')

        ];
    }
}
