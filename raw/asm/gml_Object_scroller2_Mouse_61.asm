// gml_Object_scroller2_Mouse_61  locals=2 args=0 len=628
// locals: arguments, __b__
00000000: push.imm.e 0
00000004: conv.i.v
00000008: call action_set_relative(argc=1)
00000010: popz
00000014: push.imm.e 0
00000018: conv.i.v
0000001C: push.imm.e 0
00000020: conv.i.v
00000024: push.v control
0000002C: call action_if_variable(argc=3)
00000034: pop.v.v local.__b__
0000003C: push.local.v local.__b__
00000044: conv.v.b
00000048: bf 0x20C11CC
0000004C: push.imm.e 0
00000050: conv.i.v
00000054: push.imm.e 0
00000058: conv.i.v
0000005C: push.imm.e 8
00000060: conv.i.v
00000064: call action_if_number(argc=3)
0000006C: pop.v.v local.__b__
00000074: push.local.v local.__b__
0000007C: conv.v.b
00000080: bf 0x20C11CC
00000084: push.imm.e 0
00000088: conv.i.v
0000008C: push.imm.e 0
00000090: conv.i.v
00000094: push.imm.e 9
00000098: conv.i.v
0000009C: call action_if_number(argc=3)
000000A4: pop.v.v local.__b__
000000AC: push.local.v local.__b__
000000B4: conv.v.b
000000B8: bf 0x20C11CC
000000BC: push.imm.e 0
000000C0: conv.i.v
000000C4: push.imm.e 0
000000C8: conv.i.v
000000CC: push.imm.e 10
000000D0: conv.i.v
000000D4: call action_if_number(argc=3)
000000DC: pop.v.v local.__b__
000000E4: push.local.v local.__b__
000000EC: conv.v.b
000000F0: bf 0x20C11CC
000000F4: push.imm.e 2
000000F8: conv.i.v
000000FC: push.d 1.4
00000108: conv.d.v
0000010C: push.global.v global.sca
00000114: call action_if_variable(argc=3)
0000011C: pop.v.v local.__b__
00000124: push.local.v local.__b__
0000012C: conv.v.b
00000130: not.b.d
00000134: bf 0x20C11CC
00000138: push.imm.e 641
0000013C: pushenv 0x20C11C8
00000140: push.d 0.5
0000014C: pop.v.d active
00000154: popenv 0x40C11B4
00000158: push.imm.e 0
0000015C: conv.i.v
00000160: push.imm.e 1
00000164: conv.i.v
00000168: push.v control
00000170: call action_if_variable(argc=3)
00000178: pop.v.v local.__b__
00000180: push.local.v local.__b__
00000188: conv.v.b
0000018C: bf 0x20C1250
00000190: push.imm.e 1
00000194: conv.i.v
00000198: call action_set_relative(argc=1)
000001A0: popz
000001A4: push.imm.e -1
000001A8: push.imm.e 0
000001AC: dup 1
000001B0: push.v obj0.view_xview[array]
000001B8: push.imm.e 100
000001BC: add.i.v
000001C0: pop.i.v obj0.view_xview[array]
000001C8: push.imm.e 0
000001CC: conv.i.v
000001D0: call action_set_relative(argc=1)
000001D8: popz
000001DC: push.imm.e 0
000001E0: conv.i.v
000001E4: push.imm.e 2
000001E8: conv.i.v
000001EC: push.v control
000001F4: call action_if_variable(argc=3)
000001FC: pop.v.v local.__b__
00000204: push.local.v local.__b__
0000020C: conv.v.b
00000210: bf 0x20C12D4
00000214: push.imm.e 1
00000218: conv.i.v
0000021C: call action_set_relative(argc=1)
00000224: popz
00000228: push.imm.e -1
0000022C: push.imm.e 0
00000230: dup 1
00000234: push.v obj0.view_yview[array]
0000023C: push.imm.e 100
00000240: add.i.v
00000244: pop.i.v obj0.view_yview[array]
0000024C: push.imm.e 0
00000250: conv.i.v
00000254: call action_set_relative(argc=1)
0000025C: popz
00000260: push.imm.e 0
00000264: conv.i.v
00000268: call action_set_relative(argc=1)
00000270: popz