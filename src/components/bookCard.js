import React from 'react';

export default function BookCard({ book, ...domProps }) {
    return (
        <article {...domProps} className="relative group bg-white rounded-sm overflow-hidden">
            <div className="relative bg-gray-50 p-6 h-80 flex items-center justify-center">
                <img
                    src={book.image}
                    alt={book.name}
                    className="max-h-full object-contain transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                />

                {/* top-right sequence badge */}
                <div className="absolute top-4 right-4">
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-sm font-medium text-gray-800 shadow">
                        {book.seq}
                    </div>
                </div>

                {book.outOfStock && (
                    <div className="absolute inset-0 bg-white/85 flex flex-col items-center justify-center pointer-events-none">
                        <div className="mt-3 text-sm text-gray-600">Out of stock</div>
                    </div>
                )}

                {/* Hover overlay with buttons (visible only when in stock) */}
                {!book.outOfStock && (
                    <div className="absolute inset-0 flex items-center justify-center bg-transparent group-hover:bg-gray-50 transition-colors">
                        <div className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-200 text-center">
                            <div className="space-y-3 w-56">
                                <a
                                    href={book.amazon}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block border border-gray-300 bg-white text-gray-900 py-3 rounded-md text-sm font-semibold hover:bg-gray-50"
                                >
                                    BUY PRINT
                                </a>
                                <a
                                    href={book.amazon}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block border border-gray-300 bg-white text-gray-900 py-3 rounded-md text-sm font-semibold hover:bg-gray-50"
                                >
                                    BUY E-BOOK
                                </a>
                                <a
                                    href={book.amazon}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block bg-[#01a2bb] text-white py-3 rounded-md text-sm font-semibold hover:opacity-90"
                                >
                                    BUY AUDIOBOOK
                                </a>
                                <a
                                    href={`/books/${book.id}`}
                                    className="inline-block mt-2 text-sm text-gray-800 underline"
                                >
                                    READ MORE
                                </a>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className="p-6 bg-white">
                <h3 className="text-base font-semibold text-gray-900">{book.name}</h3>
                <p className="text-sm text-gray-500 mt-2 line-clamp-3">{book.description}</p>
            </div>
        </article>
    );
}
