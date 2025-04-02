import React from 'react';

interface SectionHeaderProps {
    title: string;
    isLeft?: boolean;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
    title,
    isLeft = true,
}) => {
    return (
        <div className={`grid items-center gap-4 absolute top-0 left-0 my-4 w-full grid-cols-[1fr,max-content,1fr]`}>
            <span className={isLeft ? "h-2 bg-[#061E1E] w-[200]" : ""}></span>
            <h2 className='text-[#061E1E]'>{title}</h2>
            <span className={!isLeft ? "h-2 bg-[#061E1E]" : ""}></span>
        </div>
    );
}

export default SectionHeader;