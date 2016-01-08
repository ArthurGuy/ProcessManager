@extends('layouts.app')

@section('content')
	<div class="container-fluid" id="pings">

		<h1>Pings</h1>

		@{{ pristinePings | json }}

		<div class="card">
			<div class="card-text">
				<p v-show="filterTag">
					Filtering by: @{{ filterTag }}
					<button v-on:click="filterByTag('')" type="button" class="btn btn-sm btn-info">Reset</button>
				</p>
				<span v-for="tag in tags">
					<button v-on:click="filterByTag(tag)" type="button" class="btn btn-sm btn-info">@{{ tag }}</button>
				</span>
			</div>
		</div>

		<div class="card">

			<div class="card-text">
				<table class="table">
					<thead>
						<th>Status</th>
						<th>Name</th>
						<th>Description</th>
						<th>Tags</th>
						<th>Last Update</th>
						<th>&nbsp;</th>
					</thead>
					<tbody>
						<tr v-for="(pingIndex, ping) in pings | tagFilter filterTag">
							<td class="table-text">
								<span v-if="!ping.active">Disabled</span>
								<span v-if="ping.error">Error</span>
							</td>
							<td>
								<div v-show="!ping.edit">
									@{{ ping.name }}
								</div>
								<div v-show="ping.edit">
									<input type="text" name="name" v-model="ping.name">
								</div>
							</td>
							<td>
								<div v-show="!ping.edit">
									@{{ ping.description }}
								</div>
								<div v-show="ping.edit">
									<input type="text" name="description" v-model="ping.description">
								</div>
							</td>
							<td>
								<div v-show="!ping.edit">
									@{{ ping.tags }}
								</div>
								<div v-show="ping.edit">
									<input type="text" name="tags" v-model="ping.tags">
								</div>
							</td>
							<td>@{{ ping.last_ping | simpleDate }}</td>
							<td>
								<div v-show="!ping.edit">
									<button v-on:click="editMode(ping, true)" class="btn btn-default btn-sm">Edit</button>
									<button v-on:click="deletePing(pingIndex)" class="btn btn-danger btn-sm">Delete</button>
								</div>
								<div v-show="ping.edit">
									<button v-on:click="savePing(pingIndex)" class="btn btn-primary">Save</button>
									<button v-on:click="editMode(ping, false)" class="btn btn-default">Cancel</button>
								</div>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>


		<div class="card">
			<div class="card-header">
				Add a new ping
			</div>
			<div class="card-block">

				<div class="card-text">
					<!-- Display Validation Errors -->
					@include('common.errors')

					<form action="/pings" method="POST">
						{{ csrf_field() }}

						<div class="form-group row">
							<label for="cron-name" class="col-sm-3 form-control-label">Name</label>
							<div class="col-sm-9">
								<input type="text" name="name" id="cron-name" class="form-control" value="{{ old('cron') }}">
							</div>
						</div>

						<fieldset class="form-group">
							<div class="col-sm-offset-3">
								<button type="submit" class="btn btn-primary">Add Ping</button>
							</div>
						</fieldset>
					</form>
				</div>
			</div>
		</div>
	</div>
@endsection
