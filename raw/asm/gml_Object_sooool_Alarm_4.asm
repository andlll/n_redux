// gml_Object_sooool_Alarm_4  locals=2 args=0 len=756
// locals: arguments, __b__
00000000: push.imm.e 0
00000004: conv.i.v
00000008: call action_set_relative(argc=1)
00000010: popz
00000014: push.imm.e 4
00000018: conv.i.v
0000001C: push.imm.e 30
00000020: conv.i.v
00000024: call action_set_alarm(argc=2)
0000002C: popz
00000030: push.imm.e 156
00000034: pushenv 0x20EA5EC
00000038: push.imm.e 1
0000003C: conv.i.v
00000040: call action_set_relative(argc=1)
00000048: popz
0000004C: push.v mon
00000054: push.imm.e -5
00000058: add.i.v
0000005C: pop.v.v mon
00000064: push.imm.e 0
00000068: conv.i.v
0000006C: call action_set_relative(argc=1)
00000074: popz
00000078: popenv 0x40EA5AC
0000007C: push.imm.e 455
00000080: pushenv 0x20EA634
00000084: push.imm.e 0
00000088: conv.i.v
0000008C: push.imm.e 1
00000090: conv.i.v
00000094: push.v night
0000009C: call action_if_variable(argc=3)
000000A4: pop.v.v local.__b__
000000AC: push.local.v local.__b__
000000B4: conv.v.b
000000B8: bf 0x20EA634
000000BC: b 0x20EA63C
000000C0: popenv 0x40EA5F8
000000C4: b 0x20EA640
000000C8: popenv 0x1CEA63C
000000CC: push.local.v local.__b__
000000D4: conv.v.b
000000D8: bf 0x20EA69C
000000DC: push.imm.e 156
000000E0: pushenv 0x20EA698
000000E4: push.imm.e 1
000000E8: conv.i.v
000000EC: call action_set_relative(argc=1)
000000F4: popz
000000F8: push.v ele
00000100: push.imm.e -1
00000104: add.i.v
00000108: pop.v.v ele
00000110: push.imm.e 0
00000114: conv.i.v
00000118: call action_set_relative(argc=1)
00000120: popz
00000124: popenv 0x40EA658
00000128: push.imm.e 455
0000012C: pushenv 0x20EA6E0
00000130: push.imm.e 0
00000134: conv.i.v
00000138: push.imm.e 1
0000013C: conv.i.v
00000140: push.v dawn
00000148: call action_if_variable(argc=3)
00000150: pop.v.v local.__b__
00000158: push.local.v local.__b__
00000160: conv.v.b
00000164: bf 0x20EA6E0
00000168: b 0x20EA6E8
0000016C: popenv 0x40EA6A4
00000170: b 0x20EA6EC
00000174: popenv 0x1CEA6E8
00000178: push.local.v local.__b__
00000180: conv.v.b
00000184: bf 0x20EA748
00000188: push.imm.e 156
0000018C: pushenv 0x20EA744
00000190: push.imm.e 1
00000194: conv.i.v
00000198: call action_set_relative(argc=1)
000001A0: popz
000001A4: push.v ele
000001AC: push.imm.e 5
000001B0: add.i.v
000001B4: pop.v.v ele
000001BC: push.imm.e 0
000001C0: conv.i.v
000001C4: call action_set_relative(argc=1)
000001CC: popz
000001D0: popenv 0x40EA704
000001D4: push.imm.e 455
000001D8: pushenv 0x20EA78C
000001DC: push.imm.e 0
000001E0: conv.i.v
000001E4: push.imm.e 0
000001E8: conv.i.v
000001EC: push.v night
000001F4: call action_if_variable(argc=3)
000001FC: pop.v.v local.__b__
00000204: push.local.v local.__b__
0000020C: conv.v.b
00000210: bf 0x20EA78C
00000214: b 0x20EA794
00000218: popenv 0x40EA750
0000021C: b 0x20EA798
00000220: popenv 0x1CEA794
00000224: push.local.v local.__b__
0000022C: conv.v.b
00000230: bf 0x20EA854
00000234: push.imm.e 455
00000238: pushenv 0x20EA7EC
0000023C: push.imm.e 0
00000240: conv.i.v
00000244: push.imm.e 0
00000248: conv.i.v
0000024C: push.v dawn
00000254: call action_if_variable(argc=3)
0000025C: pop.v.v local.__b__
00000264: push.local.v local.__b__
0000026C: conv.v.b
00000270: bf 0x20EA7EC
00000274: b 0x20EA7F4
00000278: popenv 0x40EA7B0
0000027C: b 0x20EA7F8
00000280: popenv 0x1CEA7F4
00000284: push.local.v local.__b__
0000028C: conv.v.b
00000290: bf 0x20EA854
00000294: push.imm.e 156
00000298: pushenv 0x20EA850
0000029C: push.imm.e 1
000002A0: conv.i.v
000002A4: call action_set_relative(argc=1)
000002AC: popz
000002B0: push.v ele
000002B8: push.imm.e 9
000002BC: add.i.v
000002C0: pop.v.v ele
000002C8: push.imm.e 0
000002CC: conv.i.v
000002D0: call action_set_relative(argc=1)
000002D8: popz
000002DC: popenv 0x40EA810
000002E0: push.imm.e 0
000002E4: conv.i.v
000002E8: call action_set_relative(argc=1)
000002F0: popz