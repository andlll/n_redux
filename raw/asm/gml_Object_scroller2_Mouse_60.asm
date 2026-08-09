// gml_Object_scroller2_Mouse_60  locals=2 args=0 len=620
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
00000048: bf 0x20C1438
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
00000080: bf 0x20C1438
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
000000B8: bf 0x20C1438
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
000000F0: bf 0x20C1438
000000F4: push.imm.e 1
000000F8: conv.i.v
000000FC: push.imm.e 1
00000100: conv.i.v
00000104: push.global.v global.sca
0000010C: call action_if_variable(argc=3)
00000114: pop.v.v local.__b__
0000011C: push.local.v local.__b__
00000124: conv.v.b
00000128: not.b.d
0000012C: bf 0x20C1438
00000130: push.imm.e 640
00000134: pushenv 0x20C1434
00000138: push.d 0.5
00000144: pop.v.d active
0000014C: popenv 0x40C1420
00000150: push.imm.e 0
00000154: conv.i.v
00000158: push.imm.e 1
0000015C: conv.i.v
00000160: push.v control
00000168: call action_if_variable(argc=3)
00000170: pop.v.v local.__b__
00000178: push.local.v local.__b__
00000180: conv.v.b
00000184: bf 0x20C14BC
00000188: push.imm.e 1
0000018C: conv.i.v
00000190: call action_set_relative(argc=1)
00000198: popz
0000019C: push.imm.e -1
000001A0: push.imm.e 0
000001A4: dup 1
000001A8: push.v obj0.view_xview[array]
000001B0: push.imm.e -100
000001B4: add.i.v
000001B8: pop.i.v obj0.view_xview[array]
000001C0: push.imm.e 0
000001C4: conv.i.v
000001C8: call action_set_relative(argc=1)
000001D0: popz
000001D4: push.imm.e 0
000001D8: conv.i.v
000001DC: push.imm.e 2
000001E0: conv.i.v
000001E4: push.v control
000001EC: call action_if_variable(argc=3)
000001F4: pop.v.v local.__b__
000001FC: push.local.v local.__b__
00000204: conv.v.b
00000208: bf 0x20C1540
0000020C: push.imm.e 1
00000210: conv.i.v
00000214: call action_set_relative(argc=1)
0000021C: popz
00000220: push.imm.e -1
00000224: push.imm.e 0
00000228: dup 1
0000022C: push.v obj0.view_yview[array]
00000234: push.imm.e -100
00000238: add.i.v
0000023C: pop.i.v obj0.view_yview[array]
00000244: push.imm.e 0
00000248: conv.i.v
0000024C: call action_set_relative(argc=1)
00000254: popz
00000258: push.imm.e 0
0000025C: conv.i.v
00000260: call action_set_relative(argc=1)
00000268: popz