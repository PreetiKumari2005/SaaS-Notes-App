import type { User, Tenant, Note } from "./types"
import { hashPassword } from "./auth"

// In-memory database for demo purposes
// In production, this would be replaced with a real database
const users: User[] = []
const tenants: Tenant[] = []
const notes: Note[] = []

// Initialize with test data
function initializeTestData() {
  if (tenants.length === 0) {
    // Create test tenants
    const tenant1: Tenant = {
      id: "tenant-1",
      name: "Acme Corp",
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const tenant2: Tenant = {
      id: "tenant-2",
      name: "Beta Inc",
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    tenants.push(tenant1, tenant2)

    // Create test users
    const testUsers: User[] = [
      {
        id: "user-1",
        email: "admin@acme.com",
        password: hashPassword("admin123"),
        role: "admin",
        tenantId: "tenant-1",
        subscription: "pro",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "user-2",
        email: "member@acme.com",
        password: hashPassword("member123"),
        role: "member",
        tenantId: "tenant-1",
        subscription: "free",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "user-3",
        email: "admin@beta.com",
        password: hashPassword("admin123"),
        role: "admin",
        tenantId: "tenant-2",
        subscription: "pro",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "user-4",
        email: "member@beta.com",
        password: hashPassword("member123"),
        role: "member",
        tenantId: "tenant-2",
        subscription: "free",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]

    users.push(...testUsers)
  }
}

// Database operations
export class Database {
  constructor() {
    initializeTestData()
  }

  // User operations
  async findUserByEmail(email: string): Promise<User | null> {
    return users.find((user) => user.email === email) || null
  }

  async findUserById(id: string): Promise<User | null> {
    return users.find((user) => user.id === id) || null
  }

  async createUser(userData: Omit<User, "id" | "createdAt" | "updatedAt">): Promise<User> {
    const user: User = {
      ...userData,
      id: `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    users.push(user)
    return user
  }

  async updateUser(id: string, updates: Partial<User>): Promise<User | null> {
    const userIndex = users.findIndex((user) => user.id === id)
    if (userIndex === -1) return null

    users[userIndex] = { ...users[userIndex], ...updates, updatedAt: new Date() }
    return users[userIndex]
  }

  // Tenant operations
  async findTenantById(id: string): Promise<Tenant | null> {
    return tenants.find((tenant) => tenant.id === id) || null
  }

  async getUsersByTenant(tenantId: string): Promise<User[]> {
    return users.filter((user) => user.tenantId === tenantId)
  }

  // Note operations
  async getNotesByTenant(tenantId: string): Promise<Note[]> {
    return notes.filter((note) => note.tenantId === tenantId)
  }

  async getNotesByUser(userId: string, tenantId: string): Promise<Note[]> {
    return notes.filter((note) => note.userId === userId && note.tenantId === tenantId)
  }

  async findNoteById(id: string, tenantId: string): Promise<Note | null> {
    return notes.find((note) => note.id === id && note.tenantId === tenantId) || null
  }

  async createNote(noteData: Omit<Note, "id" | "createdAt" | "updatedAt">): Promise<Note> {
    const note: Note = {
      ...noteData,
      id: `note-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    notes.push(note)
    return note
  }

  async updateNote(id: string, tenantId: string, updates: Partial<Note>): Promise<Note | null> {
    const noteIndex = notes.findIndex((note) => note.id === id && note.tenantId === tenantId)
    if (noteIndex === -1) return null

    notes[noteIndex] = { ...notes[noteIndex], ...updates, updatedAt: new Date() }
    return notes[noteIndex]
  }

  async deleteNote(id: string, tenantId: string): Promise<boolean> {
    const noteIndex = notes.findIndex((note) => note.id === id && note.tenantId === tenantId)
    if (noteIndex === -1) return false

    notes.splice(noteIndex, 1)
    return true
  }
}

export const db = new Database()
