import { AppDataSource } from '../config/db';
import { User } from '../models/user.model';
import * as bcrypt from 'bcrypt';

export class UserService {
    private userRepo = AppDataSource.getRepository(User);

    async createUser(userData: Partial<User>): Promise<User> {
        if (!userData.password) {
        throw new Error("Password is required");
        }

        const hashedPassword = await bcrypt.hash(userData.password, 10);

        const user = this.userRepo.create({
        ...userData,
        password: hashedPassword
        } as Partial<User>); // Explicitly cast as Partial<User>

        return await this.userRepo.save(user);
    }

    async findUserById(id: string): Promise<User | null> {
        return this.userRepo.findOne({ 
        where: { id },
        select: ['id', 'username', 'email', 'role', 'createdAt']
        });
    }

    async findByEmail(email: string): Promise<User | null> {
        return this.userRepo.findOne({ 
        where: { email },
        select: ['id', 'email', 'password', 'role']
        });
    }

    async updateUser(id: string, updateData: Partial<User>): Promise<User | null> {
        if (updateData.password) {
        updateData.password = await bcrypt.hash(updateData.password, 10);
        }

        await this.userRepo.update(id, updateData);
        return this.findUserById(id);
    }

    async deleteUser(id: string): Promise<void> {
        await this.userRepo.delete(id);
    }
}
