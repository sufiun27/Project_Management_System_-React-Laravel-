<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Http\Resources\UserResource;

class UserController extends Controller
{
    public function index()
    {
        $users = User::orderBy('created_at', 'desc')->paginate(10);
        return UserResource::collection($users);
    }

    public function show($id)
    {
        $user = User::find($id);
        return new UserResource($user);
    }

    public function update(Request $request, $id)
    {

        $request->validate([
            'name' => 'required|string',
            'password' => 'required|string|confirmed'
        ]);

        $user = User::find($id);
        $user->name = $request->name;
        $user->password = $request->password;
        $user->save();
        return new UserResource($user);
    }

    public function destroy($id)
    {
        $user = User::find($id);
        $user->delete();
        return response()->json(null, 204);
    }

    public function userall()
    {
        $users = User::all(['name', 'email', 'id']);

        $formattedUsers = $users->map(function ($user) {
            return [
                'value' => $user->id,
                'label' => $user->name . ' (' . $user->email . ')'
            ];
        });

        return response()->json($formattedUsers);
    }

    public function userselect($id)
    {
        $users = User::where('id', $id)->get(['name', 'email', 'id']);
        return response()->json($users);
    }

    public function authuser(){
        $user = auth()->user();
        return new UserResource($user);
    }


}
