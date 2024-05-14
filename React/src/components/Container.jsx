import React from 'react'

function Container({ children }) {
    return (
      <section className="mx-auto w-full max-w-7xl px-4 py-4">
        <div className="mt-6 flex flex-col">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden md:rounded-lg">
                <div className="min-w-full divide-y divide-gray-200">
                  
                  <div>{children}</div>
                
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

export default Container
