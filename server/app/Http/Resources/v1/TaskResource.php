<?php

namespace App\Http\Resources\v1;

use App\Http\Resources\v1\UserResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TaskResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     * @param Request $request
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {

        return [
            'id' => $this->id,
            'title' => $this->title,
            'description' => $this->description,
            'priority' => $this->priority,
            'dueDate' => $this->due_date,
            'user' => new UserResource($this->user),
            'assignedBy' => new UserResource($this->assigner),
            'assignedTo' => new UserResource($this->assignee),
            'createdAt' => $this->created_at,
            'updatedAt' => $this->updated_at,
            'status' => $this->status
        ];
    }

    public static $wrap = 'task';
}
