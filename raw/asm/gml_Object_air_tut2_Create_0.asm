// gml_Object_air_tut2_Create_0  locals=2 args=0 len=632
// locals: arguments, __b__
00000000: push.imm.e 1
00000004: conv.i.v
00000008: call action_set_relative(argc=1)
00000010: popz
00000014: push.imm.e 0
00000018: conv.i.v
0000001C: push.imm.e 4
00000020: conv.i.v
00000024: push.builtin.v os_type
0000002C: call action_if_variable(argc=3)
00000034: pop.v.v local.__b__
0000003C: push.local.v local.__b__
00000044: conv.v.b
00000048: bf 0x209C000
0000004C: push.imm.e -1
00000050: push.imm.e 0
00000054: dup 1
00000058: push.v obj0.view_xview[array]
00000060: push.imm.e 500
00000064: add.i.v
00000068: pop.i.v obj0.view_xview[array]
00000070: push.imm.e 5
00000074: conv.i.v
00000078: push.v y
00000080: push.imm.e 200
00000084: add.i.v
00000088: push.v x
00000090: push.imm.e 300
00000094: add.i.v
00000098: call instance_create(argc=3)
000000A0: popz
000000A4: push.imm.e 5
000000A8: conv.i.v
000000AC: push.v y
000000B4: push.imm.e 220
000000B8: add.i.v
000000BC: push.v x
000000C4: push.imm.e 300
000000C8: sub.i.v
000000CC: call instance_create(argc=3)
000000D4: popz
000000D8: push.imm.e 8
000000DC: conv.i.v
000000E0: push.imm.e 0
000000E4: conv.i.v
000000E8: push.imm.e 0
000000EC: conv.i.v
000000F0: call instance_create(argc=3)
000000F8: popz
000000FC: push.imm.e 8
00000100: conv.i.v
00000104: push.imm.e -1128
00000108: conv.i.v
0000010C: push.imm.e 0
00000110: conv.i.v
00000114: call instance_create(argc=3)
0000011C: popz
00000120: push.imm.e 8
00000124: conv.i.v
00000128: push.imm.e -1128
0000012C: conv.i.v
00000130: push.imm.e 2000
00000134: conv.i.v
00000138: call instance_create(argc=3)
00000140: popz
00000144: push.imm.e 8
00000148: conv.i.v
0000014C: push.imm.e 1128
00000150: conv.i.v
00000154: push.imm.e 0
00000158: conv.i.v
0000015C: call instance_create(argc=3)
00000164: popz
00000168: push.imm.e 8
0000016C: conv.i.v
00000170: push.imm.e 1128
00000174: conv.i.v
00000178: push.imm.e 2000
0000017C: conv.i.v
00000180: call instance_create(argc=3)
00000188: popz
0000018C: push.imm.e 8
00000190: conv.i.v
00000194: push.imm.e 0
00000198: conv.i.v
0000019C: push.imm.e 2000
000001A0: conv.i.v
000001A4: call instance_create(argc=3)
000001AC: popz
000001B0: push.imm.e 330
000001B4: push.imm.e -1
000001B8: push.imm.e 0
000001BC: pop.v.i obj0.alarm[array]
000001C4: push.imm.e 240
000001C8: push.imm.e -1
000001CC: push.imm.e 1
000001D0: pop.v.i obj0.alarm[array]
000001D8: push.imm.e 0
000001DC: conv.i.v
000001E0: call action_set_relative(argc=1)
000001E8: popz
000001EC: push.imm.e 1
000001F0: conv.i.v
000001F4: push.imm.e 30
000001F8: conv.i.v
000001FC: call action_set_motion(argc=2)
00000204: popz
00000208: push.imm.e 1
0000020C: conv.i.v
00000210: call action_set_relative(argc=1)
00000218: popz
0000021C: push.imm.e 7
00000220: pushenv 0x209C1C0
00000224: call action_kill_object(argc=0)
0000022C: popz
00000230: popenv 0x409C1B4
00000234: push.imm.e 3
00000238: pushenv 0x209C1D8
0000023C: call action_kill_object(argc=0)
00000244: popz
00000248: popenv 0x409C1CC
0000024C: push.imm.e 730
00000250: pushenv 0x209C1F0
00000254: call action_kill_object(argc=0)
0000025C: popz
00000260: popenv 0x409C1E4
00000264: push.imm.e 0
00000268: conv.i.v
0000026C: call action_set_relative(argc=1)
00000274: popz