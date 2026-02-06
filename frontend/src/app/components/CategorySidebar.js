// "use client";
// import styles from "./CategorySidebar.module.css";

// export default function CategorySidebar({
//   categories,
//   onSelect,
//   selectedCategory,
//   loading,
// }) {

  
//   return (
//     <aside className={styles.sidebar}>
//       {loading ? (
//         <>
//           {Array.from({ length: 5 }).map((_, i) => (
//             <div key={i} className={styles.skeletonBtn} />
//           ))}
//         </>
//       ) : (
//         <>
//           <h3 className={styles.heading}>Categories</h3>

//           {/* ALL */}
//           <button
//             className={styles.button}
//             onClick={() => onSelect("all")}
//           >
//             All
//           </button>

//           {categories.map((cat, index) => (
//             <button
//               key={cat._id}
//               className={`${styles.button} ${
//                 selectedCategory === cat._id ? styles.active : ""
//               }`}
//               onClick={() =>
//                 index === 0
//                   ? onSelect("all") // 👈 first category = All
//                   : onSelect(cat._id)
//               }
//             >
//               {cat.name}
//             </button>
//           ))}
//         </>
//       )}
//     </aside>
//   );
// }
"use client";
import styles from "./CategorySidebar.module.css";

export default function CategorySidebar({
categories,
onSelect,
selectedCategory,
loading,
}) {

// 🧠 Move "Beverages" to bottom
const sortedCategories = [...categories].sort((a, b) => {
if (a.name.toLowerCase() === "beverages") return 1;
if (b.name.toLowerCase() === "beverages") return -1;
return 0;
});

return ( <aside className={styles.sidebar}>
{loading ? (
<>
{Array.from({ length: 5 }).map((_, i) => ( <div key={i} className={styles.skeletonBtn} />
))}
</>
) : (
<> <h3 className={styles.heading}>Categories</h3>

      <button
        className={styles.button}
        onClick={() => onSelect("all")}
      >
        All
      </button>

      {sortedCategories.map((cat) => (
        <button
          key={cat._id}
          className={`${styles.button} ${
            selectedCategory === cat._id ? styles.active : ""
          }`}
          onClick={() => onSelect(cat._id)}
        >
          {cat.name}
        </button>
      ))}
    </>
  )}
</aside>


);
}
