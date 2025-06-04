import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { CreateUserDTO } from "./dto/in/create-user.dto";
import { UpdateUserDTO } from "./dto/in/update-user.dto";
import { UserOutputDTO } from "./dto/out/user-output.dto";
import { UserService } from "./users.service";
import { ApiConflictResponse, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { UpdateUserPasswordDTO } from "./dto/in/update-user-password.dto";

@ApiTags("User")
@Controller("user")
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post("register")
    @ApiOperation({ summary: "Registers a new user" })
    @ApiCreatedResponse({ description: "User registered successfully" })
    @ApiConflictResponse({ description: "Email already registered" })
    async register(@Body() dto: CreateUserDTO) {
        const response = await this.userService.createUser(dto);
        return UserOutputDTO.toResponse(response);
    }

    @Get("all")
    @ApiOperation({ summary: "Gets all users" })
    @ApiOkResponse({ description: "Users found" })
    @ApiNotFoundResponse({ description: "No users found" })
    async getUsers() {
        const users = await this.userService.readUsers();
        return users.map((user) => UserOutputDTO.toResponse(user));
    }

    @Get("/:id")
    @ApiOperation({ summary: "Gets user by ID" })
    @ApiOkResponse({ description: "User found" })
    @ApiNotFoundResponse({ description: "User not found" })
    async getUser(@Param("id") id: string) {
        const response = await this.userService.readUserById(id);
        return UserOutputDTO.toResponse(response);
    }

    @Put("update/:id")
    @ApiOperation({ summary: "Updates user by ID" })
    @ApiOkResponse({ description: "User updated successfully" })
    @ApiNotFoundResponse({ description: "User not found" })
    async updateUser(@Param("id") id: string, @Body() dto: UpdateUserDTO) {
        const response = await this.userService.updateUser(id, dto);
        return UserOutputDTO.toResponse(response);
    }

    @Put("update-password/:id")
    @ApiOperation({ summary: "Update user password by ID" })
    @ApiResponse({ status: 200, description: "Password updated successfully" })
    @ApiResponse({ status: 404, description: "User not found" })
    async updateUserPassword(@Param("id") id: string, @Body() dto: UpdateUserPasswordDTO) {
        const response = await this.userService.updateUserPassword(id, dto);
        return UserOutputDTO.toResponse(response);
    }

    @Put("delete/:id")
    @ApiOperation({ summary: "Deletes user by ID" })
    @ApiOkResponse({ description: "User deleted successfully" })
    @ApiNotFoundResponse({ description: "User not found" })
    async deleteUser(@Param("id") id: string) {
        const response = await this.userService.deleteUser(id);
        return UserOutputDTO.toResponse(response);
    }
}