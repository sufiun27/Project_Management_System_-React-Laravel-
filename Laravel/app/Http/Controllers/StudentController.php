<?php

namespace App\Http\Controllers;

use App\Http\Requests\studentStore;
use Illuminate\Http\Request;
use App\Models\Student;


class StudentController extends Controller
{
    public function index()
    {
        $students = Student::all();
        return response()->json($students);
    }
    public function store(studentStore $request)
    {
        $student = new Student();
        $student->name = $request->name;
        $student->email = $request->email;
        $student->phone = $request->phone;
        $student->course = $request->course;
        $student->save();
        return response()->json(['message'=>'Student created!',200]);
    }

    public function csrf(){
        return response()->json(['csrf_token' => csrf_token()]);
    }
}
