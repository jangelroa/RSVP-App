class EventNewsController < ApplicationController
  before_action :set_event_news, only: [:show, :edit, :update, :destroy]

  # GET /event_news
  # GET /event_news.json
  def index
    @event_news = EventNew.all
  end

  # GET /event_news/1
  # GET /event_news/1.json
  def show
  end

  # GET /event_news/new
  def new
    @event_news = EventNew.new
  end

  # GET /event_news/1/edit
  def edit
  end

  # POST /event_news
  # POST /event_news.json
  def create
    @event_news = EventNew.new(event_news_params)

    respond_to do |format|
      if @event_news.save
        # format.html { redirect_to @event_news, notice: 'Event new was successfully created.' }
        format.json { render :show, status: :created, location: @event_news }
      else
        # format.html { render :new }
        format.json { render json: @event_news.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /event_news/1
  # PATCH/PUT /event_news/1.json
  def update
    respond_to do |format|
      if @event_news.update(event_news_params)
        # format.html { redirect_to @event_news, notice: 'Event new was successfully updated.' }
        format.json { render :show, status: :ok, location: @event_news }
      else
        # format.html { render :edit }
        format.json { render json: @event_news.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /event_news/1
  # DELETE /event_news/1.json
  def destroy
    @event_news.destroy
    respond_to do |format|
      # format.html { redirect_to event_news_url, notice: 'Event new was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_event_news
      @event_news = EventNew.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def event_news_params
      params.require(:event_news).permit(:title, :body)
    end
end
