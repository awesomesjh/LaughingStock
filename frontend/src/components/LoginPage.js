import { useState } from "react";

export default function LoginPage() {
    const [name, setName] = useState("Alice");

    const handleNameChangeClick = () => {
        const newName = prompt("What's your name?");
        if (newName.length === 0) {
            setName("<unknown>");
        } else {
            setName(newName);
        }
    };

    return (
        <div>
            <header>
                <h1>Rocket To-Dos</h1>
                <h2>Welcome back, {name}!</h2>
                <p>It is so nice to have you back on the app :)</p>
                <button onClick={handleNameChangeClick}>Change name</button>
            </header>
            <main>
                <h2>Add new task</h2>
                <form>
                    <input type="text" />
                    <button type="submit">Add</button>
                </form>
                <h2>Task list</h2>
                <table>
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Task</th>
                            <th>Completed?</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Wash the dishes</td>
                            <td>
                                <input type="checkbox" checked={false} />
                            </td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Buy more toilet paper</td>
                            <td>
                                <input type="checkbox" checked={true} />
                            </td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>Collect the mail</td>
                            <td>
                                <input type="checkbox" checked={true} />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </main>
        </div>
    );
}