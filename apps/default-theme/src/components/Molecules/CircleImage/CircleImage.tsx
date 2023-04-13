import Image from 'next/image';

export const CircleImage = () => {
  return (
    <div className="aspect-1 rounded-full relative overflow-hidden">
      <Image src="https://picsum.photos/640/640" alt="" fill={true} className="absolute w-full h-full object-cover object-center"/>
    </div>
  );
};
