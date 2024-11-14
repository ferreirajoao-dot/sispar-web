import { motion } from 'framer-motion';
import Image from "next/image";
import placeholderImage from "@images/photoPlaceholder.png";

export default function ComponentDocumentApproved() {

    const containerVariants = {
        hidden: { opacity: 0, scale: 0.5 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
        exit: { opacity: 0, scale: 0.5, transition: { duration: 0.5 } },
    };

    const iconVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: { opacity: 1, y: 0, transition: { duration:1 } },
    };

    return (
        <motion.div
            className="text-center"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
        >
            <motion.div variants={iconVariants}>
                <Image src={placeholderImage} alt="Success" />
            </motion.div>
            <h3>Todos os documentos foram aprovados!</h3>
            <p>Obrigado por sua paciência.</p>
        </motion.div>
    );
}