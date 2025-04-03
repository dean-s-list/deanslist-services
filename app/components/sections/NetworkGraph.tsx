"use client"

const NetworkGraph: React.FC = () => {




    return (
        <>
            <div className='' >

                <div className='max-w-[1440px] mx-auto mt-20 px-5 md:px-0'>

                    <div>

                    <div className="flex flex-col items-center space-y-4">
                        {(
                            <iframe
                                id="vybeGraph"
                                src="https://widget.vybenetwork.com/network-graph?address=Ds52CDgqdWbTWsua1hgT3AuSSy4FNx2Ezge1br3jQ14a&entity=token&connectionNode=program"
                                width="100%"
                                height="600px"
                                className="border-none"
                            ></iframe>
                        )}
                        
                       
                            </div>

                    </div>

                </div>
            </div>

        </>
    )
}

export default NetworkGraph;