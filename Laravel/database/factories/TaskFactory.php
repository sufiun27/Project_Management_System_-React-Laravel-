<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Task;
use App\Models\User;
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
        return [
            'name' => $this->faker->sentence,
            'description' => $this->faker->paragraph,
            'priority' => $this->faker->randomElement(['low', 'medium', 'high']),
            'status' => $this->faker->randomElement(['New', 'In_Progress', 'completed']),
            'comment' => $this->faker->optional()->paragraph,
            'due_date' => $this->faker->optional()->dateTimeBetween('now', '+1 year'),
            'creator_user_id' => $this->faker->randomElement($userIds),
            'assigned_user_id' => $this->faker->randomElement($userIds),
        ];
    }
}
