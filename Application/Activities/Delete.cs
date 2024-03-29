﻿using Application.Core;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Activities
{
    public class Delete
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Guid  Id { get; set; }
        }
        public class Handler : IRequestHandler<Command,Result<Unit>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
            }

            public async Task <Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = await _context.Activities.FindAsync(request.Id);

                //if (activity == null) return(null);

                _context.Remove(activity);

                var result = await _context.SaveChangesAsync()>0;

                if (!result) return Result<Unit>.Failure("Failed to delete the activity");

                return Result <Unit>.Success(Unit.Value);
            }
        }

    }
}
