<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tasks', function (Blueprint $table) {
            $table->id();
            $table->foreignId('project_id')->references('id')->on('projects')->onDelete('cascade');
            $table->string('name');
            $table->text('description');
            $table->string('priority')->default('medium');
            $table->string('status');
            $table->text('comment')->nullable();
            $table->text('reply')->nullable();
            $table->timestamp('due_date')->nullable();
            $table->foreignId('creator_user_id')->references('id')->on('users');
            $table->foreignId('assigned_user_id')->references('id')->on('users');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tasks');
    }
};
