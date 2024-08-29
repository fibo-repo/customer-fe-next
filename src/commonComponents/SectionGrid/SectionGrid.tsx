import React from "react";
import { Button } from "antd";
import { GridColumn, GridWrapper } from "./SectionGrid.style";
import Box from "@/UiComponent/Box/Box";
import PostGrid from "@/UiComponent/ProductCard/PostGrid";
import { SearchDate } from "@/types/commonTypes";

interface LoadMoreProps {
  handleLoadMore: () => void;
  showButton: boolean;
  buttonText?: string;
  loading?: boolean;
  loadMoreComponent?: React.ReactNode;
  loadMoreStyle?: React.CSSProperties;
}

const LoadMore: React.FC<LoadMoreProps> = ({
  handleLoadMore,
  showButton,
  buttonText,
  loading,
  loadMoreComponent,
  loadMoreStyle,
}) => {
  return (
    !!showButton && (
      <Box className="loadmore_wrapper" style={loadMoreStyle}>
        {loadMoreComponent ? (
          loadMoreComponent
        ) : (
          <Button type="primary" loading={loading} onClick={handleLoadMore}>
            {buttonText || "Load More"}
          </Button>
        )}
      </Box>
    )
  );
};

interface SectionGridProps {
  totalItem: number;
  datas: any[];
  columnWidth: string | number | (string | number)[];
  paginationComponent?: React.ReactNode;
  handleLoadMore?: () => void;
  loadMoreComponent?: React.ReactNode;
  loading?: boolean;
  buttonText?: string;
  searchDate: SearchDate;
  roomGuest: { guest: number; pets?: number; infants?: number; kids?: number };
}

const SectionGrid: React.FC<SectionGridProps> = ({
  totalItem,
  datas,
  columnWidth,
  paginationComponent,
  handleLoadMore,
  loadMoreComponent,
  loading,
  buttonText,
  searchDate,
  roomGuest,
}) => {
  const showButton = datas.length < totalItem;

  return (
    <>
      <GridWrapper>
        {datas && datas.length
          ? datas.map((item) => {
              return (
                <GridColumn key={item.id} columnWidth={columnWidth}>
                  <PostGrid
                    propertyData={item}
                    searchDate={searchDate}
                    roomGuest={roomGuest}
                  />
                </GridColumn>
              );
            })
          : null}
      </GridWrapper>

      {showButton && (
        <LoadMore
          showButton={showButton}
          handleLoadMore={handleLoadMore!}
          loading={loading}
          buttonText={buttonText}
          loadMoreComponent={loadMoreComponent}
        />
      )}
      {paginationComponent && (
        <Box className="pagination_wrapper">{paginationComponent}</Box>
      )}
    </>
  );
};

export default SectionGrid;
