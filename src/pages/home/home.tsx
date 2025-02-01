import { Button, Dropdown, Flex, Pagination, Table, Popconfirm } from "antd";
import { useGetList } from "../../services/query/useGet";
import { endpoints } from "../../configs/endpoints";
import { useState } from "react";
import { DeleteOutlined, EditOutlined, MoreOutlined } from "@ant-design/icons";
import { useDelete } from "../../services/mutation/useDelete";
import { useUpdate } from "../../services/mutation/useUpdate";
import CreateOrEditModal from "../../components/reusableModal";

type Companies = [
  {
    id: string;
    name: string;
    count: number;
  }
];

type Detail = {
  id: string;
  name: string;
  count: number;
};

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [detailId, setDetailId] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { data: detail, isLoading } = useGetList<Detail>({
    enebled: isEdit,
    endpoint: `${endpoints.companies.get}${detailId}`,
  });

  const { data, isLoading: dataLoading } = useGetList<Companies>({
    endpoint: endpoints.companies.list,
    params: {
      PageSize: pageSize,
      PageIndex: currentPage,
    },
  });

  const { data: total, isLoading: totalLoading } = useGetList<Companies>({
    endpoint: endpoints.companies.list,
  });

  const { mutate } = useDelete(
    endpoints.companies.delete,
    endpoints.companies.list
  );

  const { mutate: edit, isPending } = useUpdate(
    endpoints.companies.put,
    endpoints.companies.list
  );

  const onFinish = (values: any) => {
    if (isEdit) {
      edit(
        { ...values, id: detailId },
        {
          onSuccess: () => {
            setIsModalOpen(false);
            setIsEdit(false);
          },
        }
      );
    }
  };

  const handleEdit = (id: string) => {
    setDetailId(id);
    setIsEdit(true);
    setIsModalOpen(true);
  };

  return (
    <>
      <Table
        tableLayout="auto"
        loading={dataLoading || totalLoading}
        dataSource={data?.map((item) => ({ ...item, key: item.id }))}
        pagination={false}
        columns={[
          {
            title: "Названия компании",
            dataIndex: "name",
            ellipsis: true,
          },
          {
            ellipsis: true,
            title: "Количество сотрудников",
            dataIndex: "count",
            render: (count) => `${count} человек`,
          },
          {
            width: "0",
            align: "center",
            dataIndex: "id",
            render: (id) => (
              <Dropdown
                trigger={["click"]}
                menu={{
                  items: [
                    {
                      key: "edit",
                      label: (
                        <Button
                          onClick={() => handleEdit(id)}
                          block
                          icon={<EditOutlined />}
                        >
                          Изменить
                        </Button>
                      ),
                    },
                    {
                      key: "delete",
                      label: (
                        <Popconfirm
                          title="Вы уверены, что хотите удалить эту компанию?"
                          onConfirm={() => mutate(id)}
                          okText="Да"
                          cancelText="Нет"
                          placement="topLeft"
                        >
                          <Button block danger icon={<DeleteOutlined />}>
                            Удалить
                          </Button>
                        </Popconfirm>
                      ),
                    },
                  ],
                }}
                placement="topLeft"
              >
                <Button type="text" icon={<MoreOutlined />} />
              </Dropdown>
            ),
          },
        ]}
        footer={() => (
          <Flex justify="end">
            <Pagination
              size="small"
              current={currentPage}
              pageSize={pageSize}
              total={total?.length}
              showQuickJumper
              onChange={(page, size) => {
                setCurrentPage(page);
                setPageSize(size);
              }}
            />
          </Flex>
        )}
      />

      <CreateOrEditModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={onFinish}
        initialValues={
          isEdit ? { name: detail?.name, count: detail?.count } : undefined
        }
        loading={isLoading || isPending}
        title={isEdit ? "Изменить компанию" : "Добавить компанию"}
      />
    </>
  );
};

export default Home;
