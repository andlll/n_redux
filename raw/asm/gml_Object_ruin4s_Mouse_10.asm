// gml_Object_ruin4s_Mouse_10  locals=2 args=0 len=200
// locals: arguments, __b__
00000000: push.imm.e 1
00000004: conv.i.v
00000008: call action_set_relative(argc=1)
00000010: popz
00000014: push.imm.e 156
00000018: pushenv 0x2138A8C
0000001C: push.imm.e 0
00000020: conv.i.v
00000024: push.imm.e 11
00000028: conv.i.v
0000002C: push.v selec
00000034: call action_if_variable(argc=3)
0000003C: pop.v.v local.__b__
00000044: push.local.v local.__b__
0000004C: conv.v.b
00000050: bf 0x2138A8C
00000054: b 0x2138A94
00000058: popenv 0x4138A50
0000005C: b 0x2138A98
00000060: popenv 0x1D38A94
00000064: push.local.v local.__b__
0000006C: conv.v.b
00000070: bf 0x2138AE8
00000074: push.imm.e 1
00000078: conv.i.v
0000007C: push.imm.e 255
00000080: conv.i.v
00000084: call action_sprite_color(argc=2)
0000008C: popz
00000090: push.imm.e -50
00000094: conv.i.v
00000098: push.imm.e 0
0000009C: conv.i.v
000000A0: push.imm.e 663
000000A4: conv.i.v
000000A8: call action_create_object(argc=3)
000000B0: popz
000000B4: push.imm.e 0
000000B8: conv.i.v
000000BC: call action_set_relative(argc=1)
000000C4: popz