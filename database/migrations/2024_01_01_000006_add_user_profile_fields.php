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
        Schema::table('users', function (Blueprint $table) {
            $table->foreignId('role_id')->nullable()->constrained('roles')->onDelete('set null');
            $table->foreignId('class_id')->nullable()->constrained('classes')->onDelete('set null');
            $table->string('student_id')->nullable()->unique();
            $table->string('teacher_id')->nullable()->unique();
            $table->string('phone')->nullable();
            $table->date('date_of_birth')->nullable();
            $table->text('address')->nullable();
            $table->string('qr_code')->nullable()->unique();
            $table->text('face_encoding')->nullable();
            $table->string('photo')->nullable();
            
            $table->index('student_id');
            $table->index('teacher_id');
            $table->index('qr_code');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropForeign(['role_id']);
            $table->dropForeign(['class_id']);
            $table->dropColumn([
                'role_id', 'class_id', 'student_id', 'teacher_id',
                'phone', 'date_of_birth', 'address', 'qr_code',
                'face_encoding', 'photo'
            ]);
        });
    }
};