// gml_Object_iconic_box_Mouse_11  locals=2 args=0 len=152
// locals: arguments, __b__
00000000: push.imm.e 0
00000004: pop.v.i global.hc
0000000C: push.imm.e 2
00000010: conv.i.v
00000014: push.imm.e 0
00000018: conv.i.v
0000001C: push.imm.e 730
00000020: conv.i.v
00000024: call action_if_number(argc=3)
0000002C: pop.v.v local.__b__
00000034: push.local.v local.__b__
0000003C: conv.v.b
00000040: bf 0x21EBA5C
00000044: push.imm.e 730
00000048: pushenv 0x21EBA58
0000004C: push.imm.e 1
00000050: conv.i.v
00000054: push.imm.e 0
00000058: conv.i.v
0000005C: push.imm.e 1358
00000060: conv.i.v
00000064: call action_sprite_set(argc=3)
0000006C: popz
00000070: popenv 0x41EBA34
00000074: push.imm.e 1
00000078: conv.i.v
0000007C: push.imm.e 0
00000080: conv.i.v
00000084: push.imm.e 518
00000088: conv.i.v
0000008C: call action_sprite_set(argc=3)
00000094: popz