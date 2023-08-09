"use client";

import styles from './dnd.module.css'
import { useState, useRef, useEffect } from 'react';

type User = {
    id: number;
    name: string;
    username: string;
    email: string;
}


const Dnd = () => {      
    
    const [users, setUsers] = useState<User[]>([]);
    const [dragIndex, setDragIndex] = useState<number | null>(null);

    useEffect(() => {
        const getUsers = async () => {
            const response = await fetch(
              'https://jsonplaceholder.typicode.com/users'
            );
            const data  = await response.json() as User[]; 
            const mappedData = data.map((obj: User) => {
                return {
                    id: obj.id,
                    name: obj.name,
                    username: obj.username,
                    email: obj.email
                }
            })

            setUsers(mappedData);
          };
        getUsers();
    }, [])

    const dragStart = (index: number): void => {
        console.log('drag start', index);
        setDragIndex(index)
      };


    const dragEnter = (index: number): void => {
        if(dragIndex === null) return;
        if (index === dragIndex) return;

        setUsers((prevState) => {
            let newUsers = [...prevState];
            const deleteElement = newUsers.splice(dragIndex, 1)[0];
            newUsers.splice(index, 0, deleteElement);
            return newUsers;
        });

        setDragIndex(index);
      };

      const dragEnd = () => {
        console.log('drop');
        // ここでapiを叩いたりする
      };


    return (
        <div style={{ margin: '2em' }}>
          <table className={styles.excel}>
            <thead>
              <tr>
                <th className={styles.excel}>ID</th>
                <th className={styles.excel}>名前</th>
                <th className={styles.excel}>ユーザ名</th>
                <th className={styles.excel}>Email</th>
              </tr>
            </thead>
            <tbody>
                {users.map((user, index) => (
                    <tr
                        key={user.id}
                        draggable={true}
                        onDragStart={() => dragStart(index)}
                        onDragEnter={() => dragEnter(index)}
                        /** */
                        onDragOver={(event) => event.preventDefault()}
                        onDragEnd={dragEnd}
                        className={index === dragIndex ? styles.dragging : ""}
                    >
                        <td  className={styles.excel}>{user.id}</td>
                        <td className={styles.excel}>{user.name}</td>
                        <td className={styles.excel}>{user.username}</td>
                        <td className={styles.excel}>{user.email}</td>
                    </tr>
                ))}
            </tbody>
          </table>
        </div>
    );
}

export default Dnd
