// gml_Object_aincom_Create_0  locals=2 args=0 len=200
// locals: arguments, __b__
00000000: push.imm.e 0
00000004: conv.i.v
00000008: push.imm.e 240
0000000C: conv.i.v
00000010: call action_set_alarm(argc=2)
00000018: popz
0000001C: push.imm.e 1
00000020: conv.i.v
00000024: push.imm.e 30
00000028: conv.i.v
0000002C: call action_set_alarm(argc=2)
00000034: popz
00000038: push.imm.e 2
0000003C: conv.i.v
00000040: push.imm.e 60
00000044: conv.i.v
00000048: call action_set_alarm(argc=2)
00000050: popz
00000054: push.imm.e 0
00000058: conv.i.v
0000005C: push.imm.e 4
00000060: conv.i.v
00000064: push.builtin.v os_type
0000006C: call action_if_variable(argc=3)
00000074: pop.v.v local.__b__
0000007C: push.local.v local.__b__
00000084: conv.v.b
00000088: bf 0x210FEFC
0000008C: push.imm.e 0
00000090: conv.i.v
00000094: push.imm.e 0
00000098: conv.i.v
0000009C: push.d 0.3
000000A8: conv.d.v
000000AC: push.d 0.3
000000B8: conv.d.v
000000BC: call action_sprite_transform(argc=4)
000000C4: popz