// gml_Object_placeholder_Mouse_11  locals=2 args=0 len=208
// locals: arguments, __b__
00000000: push.imm.e 0
00000004: conv.i.v
00000008: push.imm.e 2
0000000C: conv.i.v
00000010: push.v making
00000018: call action_if_variable(argc=3)
00000020: pop.v.v local.__b__
00000028: push.local.v local.__b__
00000030: conv.v.b
00000034: bf 0x21DBFF8
00000038: push.imm.e 616
0000003C: pushenv 0x21DBFD0
00000040: push.imm.e 0
00000044: pop.v.i ult
0000004C: popenv 0x41DBFC4
00000050: push.imm.e 1
00000054: conv.i.v
00000058: push.imm.e 0
0000005C: conv.i.v
00000060: push.imm.e 654
00000064: conv.i.v
00000068: call action_sprite_set(argc=3)
00000070: popz
00000074: push.imm.e 0
00000078: conv.i.v
0000007C: push.imm.e 0
00000080: conv.i.v
00000084: push.v making
0000008C: call action_if_variable(argc=3)
00000094: pop.v.v local.__b__
0000009C: push.local.v local.__b__
000000A4: conv.v.b
000000A8: bf 0x21DC054
000000AC: push.imm.e 1
000000B0: conv.i.v
000000B4: push.imm.e 0
000000B8: conv.i.v
000000BC: push.imm.e 654
000000C0: conv.i.v
000000C4: call action_sprite_set(argc=3)
000000CC: popz