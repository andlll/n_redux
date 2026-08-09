// gml_Object_tutorial_square_Create_0  locals=1 args=0 len=388
// locals: arguments
00000000: push.imm.e 1
00000004: conv.i.v
00000008: call action_set_relative(argc=1)
00000010: popz
00000014: push.imm.e 0
00000018: pop.v.i phase
00000020: push.imm.e 130
00000024: conv.i.v
00000028: push.imm.e 0
0000002C: conv.i.v
00000030: push.imm.e 730
00000034: conv.i.v
00000038: call action_create_object(argc=3)
00000040: popz
00000044: push.imm.e 130
00000048: conv.i.v
0000004C: push.imm.e 0
00000050: conv.i.v
00000054: push.imm.e 3
00000058: conv.i.v
0000005C: call action_create_object(argc=3)
00000064: popz
00000068: push.imm.e 156
0000006C: pushenv 0x209C30C
00000070: push.imm.e 0
00000074: conv.i.v
00000078: call action_set_relative(argc=1)
00000080: popz
00000084: push.imm.e 9000
00000088: pop.v.i oil
00000090: push.imm.e 1
00000094: conv.i.v
00000098: call action_set_relative(argc=1)
000000A0: popz
000000A4: popenv 0x409C2D8
000000A8: push.imm.e 156
000000AC: pushenv 0x209C34C
000000B0: push.imm.e 0
000000B4: conv.i.v
000000B8: call action_set_relative(argc=1)
000000C0: popz
000000C4: push.imm.e 20000
000000C8: pop.v.i mon
000000D0: push.imm.e 1
000000D4: conv.i.v
000000D8: call action_set_relative(argc=1)
000000E0: popz
000000E4: popenv 0x409C318
000000E8: push.imm.e 189
000000EC: conv.i.v
000000F0: call instance_number(argc=1)
000000F8: pop.v.v tutpar
00000100: push.imm.e 201
00000104: conv.i.v
00000108: call instance_number(argc=1)
00000110: pop.v.v tutind
00000118: push.imm.e 207
0000011C: conv.i.v
00000120: call instance_number(argc=1)
00000128: pop.v.v tutrl
00000130: push.builtin.v os_type
00000138: push.imm.e 4
0000013C: cmp.i.v ==
00000140: bf 0x209C3B8
00000144: push.imm.e 100
00000148: pop.v.i went
00000150: push.builtin.v os_type
00000158: push.imm.e 0
0000015C: cmp.i.v ==
00000160: bf 0x209C3D8
00000164: push.imm.e 0
00000168: pop.v.i went
00000170: push.imm.e 0
00000174: conv.i.v
00000178: call action_set_relative(argc=1)
00000180: popz