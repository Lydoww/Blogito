import { db } from "@/lib/db";

export async function allUsers() {
    const users = await db.user.findMany();
    return users;
}

export async function getUser(id: any) {
    const user = await db.user.findUnique({ where: { id } });
    return user;
}

export async function deleteUser(id: any) {
    await db.user.delete({ where: { id } });
}

export async function updateUser(id: any, data: any) {
    const user = await db.user.update({ where: { id }, data });
    return user;
}

// Fonction de test
async function main() {
    try {
        // Test de allUsers()
        console.log("Test de allUsers():");
        const users = await allUsers();
        console.log("Utilisateurs trouvés:", users);

        // Test de getUser() (si vous avez un ID valide)
        // const userId = "cm55s5r1l0000w4agj8t8p48e";
        // console.log("\nTest de getUser():", userId);
        // const user = await getUser(userId);
        // console.log("Utilisateur trouvé:", user);
        // // Test de deleteUser() (si vous avez un ID valide)
        // console.log("\nTest de deleteUser():", userId);
        // await deleteUser(userId);
        // console.log("Utilisateur supprimé.");

    } catch (error) {
        console.error("Erreur:", error);
    } finally {
        await db.$disconnect();
    }
}

// Exécute le test si le fichier est lancé directement
if (require.main === module) {
    main();
}