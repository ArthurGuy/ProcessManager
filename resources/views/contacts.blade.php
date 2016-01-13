@extends('layouts.app')

@section('content')
	<div class="container-fluid">

		<h1>Contacts</h1>

		<div class="col-sm-12">

			@if (count($contacts) > 0)
				<div class="card">
					<div class="card-header">
						Contacts
					</div>

					<div class="card-text">
						<table class="table table-striped task-table">
							<thead>
								<th>Active</th>
								<th>Name</th>
								<th>Email</th>
								<th>Tags</th>
								<th>&nbsp;</th>
							</thead>
							<tbody>
								@foreach ($contacts as $contact)
									<tr>
										<td class="table-text">
											@if($contact->active)
												<span class="btn btn-success btn-sm"><span title="Active" class="octicon octicon-thumbsup"></span></span>
											@else
												<span class="btn btn-danger btn-sm"><span title="Disabled" class="octicon octicon-circle-slash"></span></span>
											@endif
										</td>
										<td class="table-text"><div>{{ $contact->name }}</div></td>
										<td class="table-text"><div>{{ $contact->email }}</div></td>
										<td class="table-text"><div>{{ implode(', ', $contact->filter_tags) }}</div></td>

										<!-- Task Delete Button -->
										<td>
											<form action="/contacts/{{ $contact->id }}" method="POST">
												{{ csrf_field() }}
												{{ method_field('DELETE') }}

												<button type="submit" class="btn btn-danger">
													<i class="fa fa-trash"></i>Delete
												</button>
											</form>
										</td>
									</tr>
								@endforeach
							</tbody>
						</table>
					</div>
				</div>
			@endif

            <div class="card">
                <div class="card-header">
                    Add a contact
                </div>
                <div class="card-block">

                    <div class="card-text">
                        <!-- Display Validation Errors -->
                        @include('common.errors')

                                <!-- New Task Form -->
                        <form action="/contacts" method="POST">
                            {{ csrf_field() }}

                                    <!-- Task Name -->
                            <div class="form-group row">
                                <label for="cron-name" class="col-sm-3 form-control-label">Name</label>
                                <div class="col-sm-9">
                                    <input type="text" name="name" id="cron-name" class="form-control" value="{{ old('name') }}">
                                </div>
                            </div>

                            <div class="form-group row">
                                <label for="cron-email" class="col-sm-3 form-control-label">Email</label>
                                <div class="col-sm-9">
                                    <input type="email" name="email" id="cron-email" class="form-control" value="{{ old('email') }}">
                                </div>
                            </div>

                            <div class="form-group row">
                                <label for="cron-filter_tags" class="col-sm-3 form-control-label">Filter tags</label>
                                <div class="col-sm-9">
                                    <input type="text" name="filter_tags" id="cron-filter_tags" class="form-control" value="{{ old('filter_tags') }}">
                                </div>
                            </div>

                            <!-- Add Task Button -->
                            <fieldset class="form-group">
                                <div class="col-sm-offset-3">
                                    <button type="submit" class="btn btn-primary">Add Cron Job</button>
                                </div>
                            </fieldset>
                        </form>
                    </div>
                </div>
            </div>
		</div>
	</div>
@endsection
