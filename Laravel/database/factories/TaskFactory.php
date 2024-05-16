<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Task;
use App\Models\User;
use App\Models\Project;
/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Task>
 */
class TaskFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */



    public function definition(): array
    {
        $userIds = User::pluck('id')->toArray();
        $projectIds = Project::pluck('id')->toArray();
        return [
            'name' => $this->faker->sentence,
            'project_id' => $this->faker->randomElement($projectIds),
            'description' => $this->faker->paragraph,
            'priority' => $this->faker->randomElement(['Low', 'Medium', 'High']),
            'status' => $this->faker->randomElement(['New', 'In_Progress', 'Completed']),
            'comment' => $this->faker->optional()->paragraph,
            'reply' => $this->faker->optional()->paragraph,
            'due_date' => $this->faker->optional()->dateTimeBetween('now', '+1 year'),
            'creator_user_id' => $this->faker->randomElement($userIds),
            'assigned_user_id' => $this->faker->randomElement($userIds),
        ];
    }
}
