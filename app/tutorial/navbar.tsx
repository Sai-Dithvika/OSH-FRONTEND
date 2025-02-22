// components/Sidebar.js

import { useEffect, useState } from 'react';


export default function Sidebar({ sections }) {
    return (
        <div className="fixed mt-12 w-[20%] min-h-screen p-4 bg-gradient-to-b from-muted/50 to-muted left-1 m-3">
            <h2 className="text-lg font-semibold mb-4">On This Page</h2>
            <ul className="space-y-2 text-gray-700">
                {sections.map((section, index) => (
                    <li key={index}>
                        <a
                            href={`#${section.id}`}
                            className="block py-1 px-2 hover:bg-blue-100 rounded-md"
                        >
                            {section.title}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}
