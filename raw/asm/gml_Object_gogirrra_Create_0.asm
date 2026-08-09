// gml_Object_gogirrra_Create_0  locals=2 args=0 len=200
// locals: arguments, __b__
00000000: push.imm.e 0
00000004: conv.i.v
00000008: push.imm.e 4
0000000C: conv.i.v
00000010: push.builtin.v os_type
00000018: call action_if_variable(argc=3)
00000020: pop.v.v local.__b__
00000028: push.local.v local.__b__
00000030: conv.v.b
00000034: bf 0x20BFD30
00000038: push.imm.e 0
0000003C: conv.i.v
00000040: push.imm.e 0
00000044: conv.i.v
00000048: push.d 0.89
00000054: conv.d.v
00000058: push.d 0.89
00000064: conv.d.v
00000068: call action_sprite_transform(argc=4)
00000070: popz
00000074: push.imm.e 0
00000078: conv.i.v
0000007C: push.imm.e 0
00000080: conv.i.v
00000084: push.builtin.v os_type
0000008C: call action_if_variable(argc=3)
00000094: pop.v.v local.__b__
0000009C: push.local.v local.__b__
000000A4: conv.v.b
000000A8: bf 0x20BFD84
000000AC: push.imm.e 0
000000B0: conv.i.v
000000B4: push.imm.e 0
000000B8: conv.i.v
000000BC: call action_move_to(argc=2)
000000C4: popz